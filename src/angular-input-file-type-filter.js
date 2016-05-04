/**
 * Created by JuanCruz on 4/5/2016.
 */

(function(window, undefined) {

    'use strict';

    var mod = window.angular.module('juanx.inputTypeFilter', []);

    mod.directive('fileTypeLimit', [
        '$timeout',
        function ($timeout) {
            return {
                restrict: 'A',
                require: '?ngModel',
                link: function (scope, elem, attrs, ngModel) {

                    /* istanbul ignore if */
                    if (!ngModel) {
                        return;
                    }

                    var rawFiles = [];
                    var typesSupported = attrs.accept.replace(/[\s]+/g, '').split(",") || ['image/png'];
                    function _readFiles () {

                        for (var i = rawFiles.length - 1; i >= 0; i--) {
                            var file = rawFiles[i];

                            if ( typesSupported.indexOf(file.type) === -1 ){
                                ngModel.$setValidity('invalidFileType', false);
                                $timeout(function(){
                                    ngModel.$setViewValue(null);
                                    elem[0].value = ""
                                })
                            } else {
                                ngModel.$setValidity('invalidFileType', true);
                            }
                        }
                    }

                    elem.on('change', function(e) {

                        if(!e.target.files.length) {
                            return;
                        }

                        rawFiles = e.target.files;
                        _readFiles();
                    });
                }
            };

        }]);

})(window);