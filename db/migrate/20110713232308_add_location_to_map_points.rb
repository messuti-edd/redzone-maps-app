class AddLocationToMapPoints < ActiveRecord::Migration
  def self.up
    add_column :map_points, :pais_id, :integer
    add_column :map_points, :departamento_id, :integer
    add_column :map_points, :provincia_id, :integer
    add_column :map_points, :localidad_id, :integer
  end

  def self.down
    remove_column :map_points, :localidad_id
    remove_column :map_points, :provincia_id
    remove_column :map_points, :departamento_id
    remove_column :map_points, :pais_id
  end
end
