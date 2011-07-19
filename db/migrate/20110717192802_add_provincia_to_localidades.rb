class AddProvinciaToLocalidades < ActiveRecord::Migration
  def self.up
    add_column :localidads, :departamento_id, :integer
    add_column :localidads, :provincia_id, :integer
  end

  def self.down
    remove_column :localidads, :provincia_id
    remove_column :localidads, :departamento_id
  end
end
