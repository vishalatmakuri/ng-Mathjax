angular.module('mathJaxRender',[])
.directive('ngMathjax', function () {

MathJax.Hub.Config({
  skipStartupTypeset: true
});
MathJax.Hub.Configured();
        return{
        restrict:'A',
        scope:{
            render:'='
        },
        tamplate:'<div><div>',
        link: function ($scope, $element, $attrs){

            $scope.$watch(   'render' ,function(formula){
                var parsed = math.parse(formula) ;
                var latex = parsed.value !=='undefined'? parsed.toTex({parenthesis:'keep'}):'';
                $element.html('$$'+latex+'$$')
                MathJax.Hub.Queue(['Typeset',  MathJax.Hub, $element[0]]);
            })
        }
    };
});
