class Question < ApplicationRecord
  belongs_to :question_group, touch: true

  enum :kind, [ :input_text, :input_select, :input_radio, :input_checkbox ]


  validates :label, presence: true
end
