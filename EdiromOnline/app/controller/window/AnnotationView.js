/**
 *  Edirom Online
 *  Copyright (C) 2011 The Edirom Project
 *  http://www.edirom.de
 *
 *  Edirom Online is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Edirom Online is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Edirom Online.  If not, see <http://www.gnu.org/licenses/>.
 *
 *  ID: $Id: AnnotationView.js 1298 2012-04-27 15:17:35Z daniel $
 */
Ext.define('de.edirom.online.controller.window.AnnotationView', {

    extend: 'Ext.app.Controller',

    views: [
        'window.AnnotationView'
    ],

    init: function() {
        this.control({
            'annotationView': {
                afterlayout : this.onAfterLayout,
                showAnnotation: this.onShowAnnotation
            }
        });
    },

    onAfterLayout: function(view) {

        return;

        var me = this;

        if(view.initialized) return;
        view.initialized = true;
    },

    onShowAnnotation: function(view, uri) {

        Ext.Ajax.request({
            url: 'data/xql/getAnnotationText.xql',
            method: 'GET',
            params: {
                uri: uri
            },
            success: function(response){
                view.setContent(response.responseText);
            },
            scope: this
        });

        Ext.Ajax.request({
            url: 'data/xql/getAnnotationMeta.xql',
            method: 'GET',
            params: {
                uri: uri
            },
            success: function(response){
                view.setMeta(response.responseText);
            },
            scope: this
        });


        Ext.Ajax.request({
            url: 'data/xql/getAnnotationPreviews.xql',
            method: 'GET',
            params: {
                uri: uri
            },
            success: function(response){
                var data = Ext.JSON.decode(response.responseText);
                view.setPreview(data['participants']);
            },
            scope: this
        });
    }
});