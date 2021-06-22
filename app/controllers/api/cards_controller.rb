module Api
  class CardsController < ApplicationController
    before_action :get_card, only: %i[destroy show update]

    def show
      render json: CardSerializer.new(@card).serializable_hash.to_json
    end

    def create
      if user_signed_in?
        @card = Card.new(card_params)
        if @card.save
          render json: CardSerializer.new(@card).serializable_hash.to_json
        else
          render json: { error: @card.errors.messages }, status: 422
        end
      else
        render json: {}, status: 401
      end
    end

    def destroy
      if user_signed_in?
        if @card.destroy
          head :no_content
        else
          render json: { error: @card.errors.messages }, status: 422
        end
      else
        render json: {}, status: 401
      end
    end

    def update
      if user_signed_in?
        if @card.update(card_params)
          render json:
                   CardSerializer.new(@card).serializable_hash.to_json
        else
          render json: { error: @card.errors.messages }, status: 422
        end
      else
        render json: {}, status: 401
      end
    end

    private

    def get_card
      @card = Card.find(params[:id])
    end

    def card_params
      params.require(:card).permit(:front, :back, :deck_id)
    end
  end
end
