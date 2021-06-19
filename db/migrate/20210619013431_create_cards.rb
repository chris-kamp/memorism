class CreateCards < ActiveRecord::Migration[6.1]
  def change
    create_table :cards do |t|
      t.belongs_to :deck, null: false, foreign_key: true
      t.text :front
      t.text :back

      t.timestamps
    end
  end
end
