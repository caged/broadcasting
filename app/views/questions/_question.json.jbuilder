json.extract! question, :id, :label, :kind, :value, :question_group_id, :created_at, :updated_at
json.url question_url(question, format: :json)
