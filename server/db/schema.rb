ActiveRecord::Schema.define(version: 2020_03_08_114656) do

  create_table "todo_lists", force: :cascade do |t|
    t.string "date", null: false
    t.string "description", null: false
    t.string "assigned_to", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "is_disabled"
  end

  create_table "users", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
