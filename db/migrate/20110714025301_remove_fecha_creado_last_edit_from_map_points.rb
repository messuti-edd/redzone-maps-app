class RemoveFechaCreadoLastEditFromMapPoints < ActiveRecord::Migration
  def self.up
    remove_column :map_points, :fecha_creado
    remove_column :map_points, :fecha_last_edit
  end

  def self.down
    add_column :map_points, :fecha_last_edit, :datetime
    add_column :map_points, :fecha_creado, :datetime
  end
end
