# chatspace DB設計

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: :false|
|email|string|null: :false, unique: true|
|created_at|datetime|
|updated_at|datetime|

### Association
-has_many: groups, through: :group_users
-has_many: group_users
-has_many: messages, dependent: :destroy


## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: :false, unique: true|
|created_at|datetime|
|updated_at|datetime|

### Association
-has_many: users, through: :group_users
-has_many: group_users
-has_many: messages

## group_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, index: true, foreign_key: true|
|group_id|integer|null: false, index: true, foreign_key: true|
|created_at|datetime|
|updated_at|datetime|

### Association
- belongs_to :user
- belongs_to :group

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|content|string|
|image|string|
|user_id|integer|null: :false, foregin_key: true, index: true|
|group_id|integer|null: :false, foreign_key: true, index: true|
|created_at|datetime|
|updated_to|datetime|

### Association
- belongs_to: user
- belongs_to: group
