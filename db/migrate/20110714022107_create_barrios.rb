class CreateBarrios < ActiveRecord::Migration
  def self.up
    create_table :barrios do |t|
      t.string :nombre

      t.timestamps
    end
  end

  def self.down
    drop_table :barrios
  end
end
