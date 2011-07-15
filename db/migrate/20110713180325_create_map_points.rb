class CreateMapPoints < ActiveRecord::Migration
  def self.up
    create_table :map_points do |t|
      t.text :descr
      t.datetime :fecha
      t.datetime :fecha_creado
      t.datetime :fecha_last_edit
      t.float :lat
      t.float :lng
      t.integer :tipo_id
      t.integer :user_id

      t.timestamps
    end
  end

  def self.down
    drop_table :map_points
  end
end
