class CreateUsers < ActiveRecord::Migration
  def self.up
    create_table :users do |t|
      t.string :username
      t.string :name
      t.string :lastname
      t.string :email
      t.integer :login_count
      t.datetime :las_request_at
      t.datetime :last_login_at
			t.datetime :current_login_at
			t.string :last_login_ip
			t.string :current_login_ip
      t.timestamps
    end
  end

  def self.down
    drop_table :users
  end
end
