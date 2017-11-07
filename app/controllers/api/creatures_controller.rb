class Api::CreaturesController < ApplicationController

    def index
        @creatures = Creature.all
        render json: @creatures
    end

    def create 
        #whitelist params and save them to a varaible

        #create a new creature with the creature params
        @creature = Creature.new(creature_params)

        #if creature saves, render the new creature in JSON

        if @creature.save
            render json: @creature
        end
    end

    #display a specific creature
    def show
        #get the id from the params
        creature_id = params[:id]

        #use creature_id  to find the creature in the database
        # and save it ot an instance variable
        @creature = Creature.find_by_id(creature_id)

        render json: @creature
    end

    def update
        # get the creature id from the url params
     creature_id = params[:id]
      
    # use `creature_id` to find the creature in the database and save to variable
    @creature = Creature.find_by_id(creature_id)

      # update the creature
      @creature.update_attributes(creature_params)
    # render JSON of updated creature
    render json: @creature 
    end


    def destroy
    # get the creature id from the url params
    creature_id = params[:id]
    # use `creature_id` to find the creature in the database and save it to a variable
    @creature = Creature.find_by_id(creature_id).delete
    # destroy the creature

    # redirect to creatures index
    render json: {
        msg: "Successfully deleted"
    }
    end




    private

    def creature_params

    params.require(:creature).permit(:name, :description)
        
    end





end
