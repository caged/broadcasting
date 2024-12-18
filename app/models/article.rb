class Article < ApplicationRecord
  broadcasts_refreshes

  validates :title, presence: true
end
