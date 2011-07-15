class AddBarrioToMapPoints < ActiveRecord::Migration
  def self.up
    add_column :map_points, :barrio_id, :integer
  end

  def self.down
    remove_column :map_points, :barrio_id
  end
end
