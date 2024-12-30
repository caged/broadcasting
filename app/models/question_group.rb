class QuestionGroup < ApplicationRecord
  broadcasts_refreshes
  has_many :questions, -> { order(created_at: :asc) }, dependent: :destroy
end
