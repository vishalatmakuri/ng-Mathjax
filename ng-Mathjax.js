angular.module('mathJaxRender', [])
    .directive('ngMathjax', function () {

        MathJax.Hub.Config({
            skipStartupTypeset: true
        });
        MathJax.Hub.Configured();
        return {
            restrict: 'A',
            scope: {
                render: '='
            },
            link: function ($scope, $element, $attrs) {
                $scope.$watch('render', function (formula) {
                    try{
                        var parsed = math.parse(formula);
                    } catch (e){
                        $element[0].style['background-color']='#F8C7C7';
                    }
                    if(parsed){
                        $element[0].style['background-color'] = 'white';
                        var latex = parsed.value !== 'undefined' ? parsed.toTex({
                            parenthesis: 'keep'
                        }) : '';
                        $scope.style='';
                        $element.html('$$' + latex + '$$');
                        MathJax.Hub.Queue(['Typeset', MathJax.Hub, $element[0]]);
                    }
                });
            }
        };
    });
