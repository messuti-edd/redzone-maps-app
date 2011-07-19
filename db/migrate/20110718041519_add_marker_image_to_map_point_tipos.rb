class AddMarkerImageToMapPointTipos < ActiveRecord::Migration
  def self.up
    add_column :map_point_tipos, :marker_image, :string
  end

  def self.down
    remove_column :map_point_tipos, :marker_image
  end
end
