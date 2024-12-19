class CreateQuestionGroups < ActiveRecord::Migration[8.0]
  def change
    create_table :question_groups do |t|
      t.string :title

      t.timestamps
    end
  end
end
