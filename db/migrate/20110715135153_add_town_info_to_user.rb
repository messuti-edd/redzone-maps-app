class AddTownInfoToUser < ActiveRecord::Migration
  def self.up
    add_column :users, :home_town, :string
    add_column :users, :location, :string
  end

  def self.down
    remove_column :users, :location
    remove_column :users, :home_town
  end
end
