class CreateActivities < ActiveRecord::Migration[5.0]
  def change
    create_table :activities do |t|
    	t.string :category
    	t.string :title
    	t.text :description
    	t.belongs_to :trip, foreign_key: true
      t.timestamps
    end
  end
end
