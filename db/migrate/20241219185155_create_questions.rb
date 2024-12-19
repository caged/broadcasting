class CreateQuestions < ActiveRecord::Migration[8.0]
  def change
    create_table :questions do |t|
      t.string :label
      t.integer :kind
      t.string :value
      t.references :question_group, null: false, foreign_key: true

      t.timestamps
    end
  end
end
