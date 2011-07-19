class AddLocalidadToBarrios < ActiveRecord::Migration
  def self.up
    add_column :barrios, :localidad_id, :integer
  end

  def self.down
    remove_column :barrios, :localidad_id
  end
end
