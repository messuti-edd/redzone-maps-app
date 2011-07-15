class CreateProvincias < ActiveRecord::Migration
  def self.up
    create_table :provincias do |t|
      t.string :nombre

      t.timestamps
    end
  end

  def self.down
    drop_table :provincias
  end
end
