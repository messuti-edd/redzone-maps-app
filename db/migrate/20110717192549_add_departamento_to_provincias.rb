class AddDepartamentoToProvincias < ActiveRecord::Migration
  def self.up
    add_column :provincias, :departamento_id, :integer
  end

  def self.down
    remove_column :provincias, :departamento_id
  end
end
