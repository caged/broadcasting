class Question < ApplicationRecord
  belongs_to :question_group, touch: true

  enum :kind, [ :input_text, :input_select, :input_radio, :input_checkbox ]

  validates :label, presence: true

  def human_label
    label.split('::').first
  end

  def choices
    if input_select? || input_radio? || input_checkbox?
      label.split('::').last.split(',').map { |choice| [choice, choice] }
    else
      []
    end
  end
end
