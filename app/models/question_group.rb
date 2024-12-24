class QuestionGroup < ApplicationRecord
  broadcasts_refreshes
  has_many :questions, dependent: :destroy
end
