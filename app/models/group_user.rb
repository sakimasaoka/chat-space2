class GroupUser < ApplicationRecord
  belongs_to :group
  belong_to :user
end
