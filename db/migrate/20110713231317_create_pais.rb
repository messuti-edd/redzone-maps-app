class CreatePais < ActiveRecord::Migration
  def self.up
    create_table :pais do |t|
      t.string :nombre
      t.string :nombre_corto

      t.timestamps
    end
  end

  def self.down
    drop_table :pais
  end
end
