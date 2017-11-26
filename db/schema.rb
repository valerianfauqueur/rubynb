# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171126175438) do

  create_table "addresses", force: :cascade do |t|
    t.string "street_number"
    t.string "street_name"
    t.string "city"
    t.string "zip_code"
    t.string "contry"
    t.string "full_name"
    t.float "lat"
    t.float "lng"
  end

  create_table "announcements", force: :cascade do |t|
    t.integer "game_id"
    t.string "title"
    t.string "description"
    t.integer "min_reservation"
    t.integer "max_reservation"
    t.integer "renting_price"
    t.integer "caution_price"
    t.index ["game_id"], name: "index_announcements_on_game_id"
  end

  create_table "games", force: :cascade do |t|
    t.integer "user_id"
    t.string "name"
    t.integer "max_players"
    t.integer "min_players"
    t.integer "min_age"
    t.integer "max_age"
    t.string "status"
    t.boolean "rentable"
    t.index ["user_id"], name: "index_games_on_user_id"
  end

  create_table "pictures", force: :cascade do |t|
    t.string "image"
    t.integer "announcement_id"
    t.index ["announcement_id"], name: "index_pictures_on_announcement_id"
  end

  create_table "reservations", force: :cascade do |t|
    t.integer "user_id"
    t.integer "game_id"
    t.date "startDate"
    t.date "endDate"
    t.string "status"
    t.index ["game_id"], name: "index_reservations_on_game_id"
    t.index ["user_id"], name: "index_reservations_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name"
    t.string "last_name"
    t.string "avatar_file_name"
    t.string "avatar_content_type"
    t.integer "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
