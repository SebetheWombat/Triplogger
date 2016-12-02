class CreatePhotos < ActiveRecord::Migration[5.0]
  def change
    create_table :photos do |t|
    	t.attachment :image
    	t.string :title
    	t.belongs_to :trip

      t.timestamps
    end
  end
end
