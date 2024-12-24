class Question < ApplicationRecord
  belongs_to :question_group, touch: true
end
