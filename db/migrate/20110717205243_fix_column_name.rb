class FixColumnName < ActiveRecord::Migration
  def self.up
		rename_column :map_points, :tipo_id, :map_point_tipo_id
  end

  def self.down
		rename_column :map_points, :map_point_tipo_id, :tipo_id
  end
end
