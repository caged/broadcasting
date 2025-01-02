# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end


# First QuestionGroup with questions
satisfaction_survey = QuestionGroup.find_or_create_by!(title: "Customer Satisfaction Survey")

[
  { label: "How satisfied were you with our service?::Very Satisfied,Satisfied,Neutral,Dissatisfied", kind: :input_radio },
  { label: "Would you recommend us to others?::Yes,No,Maybe", kind: :input_select },
  { label: "What aspects need improvement?", kind: :input_text }
].each do |question_attrs|
  satisfaction_survey.questions.find_or_create_by!(question_attrs)
end

# Second QuestionGroup with questions
product_feedback = QuestionGroup.find_or_create_by!(title: "Product Feedback Form")

[
  { label: "How often do you use our product?::Daily,Weekly,Monthly,Rarely", kind: :input_select },
  { label: "What features do you use?::Dashboard,Reports,Analytics,API,Mobile App", kind: :input_checkbox },
  { label: "Additional comments", kind: :input_text }
].each do |question_attrs|
  product_feedback.questions.find_or_create_by!(question_attrs)
end
