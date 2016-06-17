    //**************************************compare password*************
app.directive('compareTo', [function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {
             
            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };
 
            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
}]); 
//************use for upload image
app.directive('fileModel', ['$parse', function ($parse) {
return {
    restrict: 'A',
    link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;
        element.bind('change', function(){
            scope.$apply(function(){
               modelSetter(scope, element[0].files[0]);
            });
        });
    }
};
}]);

///start  
 app.filter('startFrom', function () {
    return function (input, start) {
        if (input) {
            start = +start;
            return input.slice(start);
        }
        return [];
    };
})
 //***************show cart div
 app.directive("myCoolDirective", function() {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            $(elem).click(function() {
                var target = $(elem).next(".panel-collapse");
                target.hasClass("collapse") ? target.collapse("show") : target.collapse("hide");
            });
        }
    }
});