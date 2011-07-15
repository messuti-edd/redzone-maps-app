class AddPaisToDepartamento < ActiveRecord::Migration
  def self.up
    add_column :departamentos, :pais_id, :integer
  end

  def self.down
    remove_column :departamentos, :pais_id
  end
end
