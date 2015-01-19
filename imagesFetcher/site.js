
/*
This file is the model for entry point for the requirJS and the controller of Knockout
Moeen Mohsin
29/December/2014
*/

require(['knockout-3.0.0', 'gallery'], function(ko, appViewModel) {


// using jQuery for convenience but any other JS library or plain onload function would also be fine
//$(function() {
    // create viewModel instance
    var viewModel = new appViewModel();

    var isImagesLoading = false; 
    var currentPageNumber = 1;// this will handel the pageNumber.
    
    var initialize = function ()
    {
        console.log("sites init called");
        
    }
    var clearbtn = document.getElementById("clearButton");
    var searchTags = document.getElementById("id_tags");
    var searchButton = document.getElementById("searchBtn");
    
    searchTags.addEventListener('keydown',function(event){
        
        if(event.keyCode == 13)
             viewModel.loadImages(isImagesLoading,searchTags.value,currentPageNumber);
        else if (event.keyCode == 8 ){// clear the gallery if the user press the back button//&& searchTags.value.length == 1
            currentPageNumber = 1; // reset the page
            viewModel.clearImages();
        }
            
             
    });
    
    searchButton.addEventListener('click', function(){
        
        viewModel.loadImages(isImagesLoading,searchTags.value,currentPageNumber);
        
    });
    
    
    clearbtn.addEventListener('click', function() {
        
        currentPageNumber = 1;
        viewModel.clearImages();
        
    });
             
    $(window).scroll(function() {
        clearTimeout($.data(this, 'scrollTimer'));
        $.data(this, 'scrollTimer', setTimeout(function() {
            if ($(window).height() + $(window).scrollTop() > $(document).height()-300) {
                      if(!isImagesLoading)
                      {
                         console.log('Scrolled to Page Bottomm, Loading More data');
                         currentPageNumber++; // next Page
                         viewModel.loadImages(isImagesLoading,searchTags.value,currentPageNumber);
                      }
                 }
            
        }, 200));
    });
    

    ko.applyBindings(viewModel,$('body').get(0));
});