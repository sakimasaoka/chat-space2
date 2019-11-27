# README

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|name|string|null: false, index: true|
|email|string|null: false|
|password|string|null: false|


### Association
- has_many :users_groups
- has_many :messeages
- has_many  :groups,  through:  :users_groups



## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|name|string|null: false|



### Association
- has_many :users_groups
- has_many :messages
- has_many :users,  through:  :users_groups


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer| null: false, foreign_key: true|
|text|text| |
|time|datetime| |
|image|string| |
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|


### Association
- belongs_to :group
- belongs_to :user


## users_groupsテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|


### Association
- belongs_to :user
- belongs_to :group

