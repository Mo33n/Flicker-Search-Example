/*
This file is the viewmodel of Knockout
Moeen Mohsin
29/December/2014
*/

define(['knockout-3.0.0'], function(ko) {



// define Gallery viewmodel
return Gallery = function() {
    // create self reference for use inside functions
    var self = this;

    // observable array to hold our gallery items
    this.itemsObservables = ko.observableArray();

    this.loadImages = function(isImagesLoading, tag,pageNumber){
        isImagesLoading = true;
        
         $.getJSON("https://api.flickr.com/services/rest/?",
        {
            tags            : tag,//this will be the query//
            format          : config.flickerApi.ResponseFormat,
            method          : config.flickerApi.ApiMethod,
            api_key         : config.flickerApi.ApiKey,
            per_page        : config.flickerApi.PerPageImageLimit,
            page            : pageNumber,
            nojsoncallback  : 1
            
            //Add as much parameters as you want
            //Guide : https://www.flickr.com/services/api/flickr.photos.search.html
            
        },
        function(data) {
            
            if(data.stat == "ok")
            {
                //success
                var underlyingArray = self.itemsObservables();
               $.each(data.photos.photo, function(i,item){
                   
            	underlyingArray.push(new self.GalleryItem(item));
                   
 				
            }); 
            
            self.itemsObservables.valueHasMutated();
            isImagesLoading = false;
                
            }
            
            
        });
        
        
    }
    
    this.clearImages = function(){
        self.itemsObservables.removeAll()
    }


    // // utility function to capture click on a controller item and select the relevant gallery image
    // this.select = function(e) {
    //     // get selected item by calling dataFor with event target node
    //     var newSelection = ko.dataFor(e.target);

    //     // call independent setSelected method
    //     self.setSelected(newSelection);

    //     // cancel original event
    //     e.preventDefault();
    // }

    // this.setSelected = function(newSelection) {
    //     // loop through and set appropriate selection
    //     ko.utils.arrayForEach(self.itemsObservables(),function(item) {
    //         item.isSelected(item == newSelection);
    //     });
    // }
    
    this.GalleryItem = function(record) {
        
        this.buildUrl = function(record){
            return "https://farm"+record.farm+".staticflickr.com/"+ record.server +"/"+record.id + "_"+ record.secret +"_"+"m" + ".jpg"; // m is for medium
        }
        
        this.title = record.title;
        this.isSelected = ko.observable(false);
        this.src = this.buildUrl(record);
    
    }
}



});