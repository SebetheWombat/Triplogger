class CreateTrips < ActiveRecord::Migration[5.0]
  def change
    create_table :trips do |t|
    	t.string :location
    	t.integer :rating
    	t.datetime :start_date
    	t.datetime :end_date
    	t.text :summary
      	t.timestamps
    end
  end
end
