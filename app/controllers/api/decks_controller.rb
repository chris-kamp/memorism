module Api
  class DecksController < ApplicationController
    before_action :get_deck, only: %i[show update destroy]
    before_action :set_options, only: %i[index show update create]

    def index
      @decks = user_signed_in? ? Deck.where(user: current_user).or(Deck.where(public: true)) : Deck.where(public: true)
      render json:
               DeckSerializer.new(@decks, @options).serializable_hash.to_json
    end

    def show
      if @deck.public || (user_signed_in?) && @deck.user == current_user
        render json: DeckSerializer.new(@deck, @options).serializable_hash.to_json
      else
        render json: {}, status: 401
      end
    end

    def create
      if user_signed_in?
        @deck = current_user.decks.new(deck_params)
        @deck = User.first.decks.new(deck_params)
        if @deck.save
          render json: DeckSerializer.new(@deck, @options).serializable_hash.to_json
        else
          render json: { error: @deck.errors.messages }, status: 422
        end
      else
        render json: {}, status: 401
      end
    end

    def update
      if user_signed_in? && @deck.user == current_user
        if @deck.update(deck_params)
          render json:
                   DeckSerializer.new(@deck, @options).serializable_hash.to_json
        else
          render json: { error: @deck.errors.messages }, status: 422
        end
      else
        render json: {}, status: 401
      end
    end

    def destroy
      if user_signed_in? && @deck.user == current_user
        if @deck.destroy
          head :no_content
        else
          render json: { error: @deck.errors.messages }, status: 422
        end
      else
        render json: {}, status: 401
      end
    end

    private

    def get_deck
      @deck = Deck.find(params[:id])
    end

    def deck_params
      params.require(:deck).permit(:title, :description, :public)
    end

    def set_options
      @options = { include: %i[cards user] }
    end
  end
end
