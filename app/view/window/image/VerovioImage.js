/**
 *  Edirom Online
 *  Copyright (C) 2014 The Edirom Project
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
 */
Ext.define('EdiromOnline.view.window.image.VerovioImage', {
	extend: 'Ext.panel.Panel',
	
	//	mixins: {
	//		observable: 'Ext.util.Observable'
	//	},
	//
	
	layout: 'fit',
	
	
	currId: null,
	renderer: null,
	//border: 0,
	text: null,
	imageSet: null,
	pageSpinner: null,
	pageHeight: null,
    pageWidth: null,
	
	initComponent: function () {
		
		var me = this;
		me.currId = me.id;
		
		app = EdiromOnline.getApplication();
		me.renderer = app.getRenderer();
		
		me.callParent();
	},
	
	setImageSet: function (imageSet, pageHeight, pageWidth) {
		var me = this;
		me.imageSet = imageSet;
		me.pageWidth = pageWidth;
		me.pageHeight = pageHeight;
	},
	
	setMovements: function (pageNumber) {
		
		var me = this;
		
		
		
		//********** One  Page, e.g. 2 ***************
		
		//pageHeight = $(document).height() ;
        //pageWidth = $(document).width();
		
		
		 var options = JSON.stringify({
		scale: 33,
		noLayout: 0,
			pageHeight: me.pageHeight,
             pageWidth: me.pageWidth,
             adjustPageHeight: 1
		
        //                    ignoreLayout: 1
		});
		me.renderer.setOptions(options);
		me.renderer.loadData(me.imageSet);		
		var svg = me.renderer.renderPage(pageNumber, options );
		var pageCount = me.renderer.getPageCount();
		me.pageSpinner.setStore(pageCount);
		me.pageSpinner.setPage(pageNumber);
		$('#' + me.currId + '-body').html(svg);
		
		//********** All Pages ***************
//		var options = JSON.stringify({
//			scale: 33,
//			//pageHeight: 4100,
//			//pageWidth: 4200,
//			//ignoreLayout: 1
//			noLayout: 0,
//			adjustPageHeight: 0
//			// TODO
//			// ignoreLayout: 1 + pageHight + PageWidth
//		});
//		me.renderer.setOptions(options);
//		me.renderer.loadData(me.imageSet);		
//		var svg = me.renderer.renderPage(1, options);
//		var pageCount = me.renderer.getPageCount();
//		me.pageSpinner.setStore(pageCount);
//		for (i = 2; i <= pageCount; i++) {
//			svg = svg + me.renderer.renderPage(i, options);
//		}
//		$('#' + me.currId + '-body').html(svg);
	},
	
	
	setMovements_1: function () {
		
		var me = this;
		
		var options = JSON.stringify({
			scale: 33,
			//pageHeight: 4100,
			//pageWidth: 4200,
			noLayout: 1
		});
		me.renderer.setOptions(options);
		me.renderer.loadData(me.imageSet);
		var svg = me.renderer.renderPage(1, options);
		for (i = 2; i <= me.renderer.getPageCount();
		i++) {
			svg = svg + me.renderer.renderPage(i, options);
		}
		$('#' + me.currId + '-body').html(svg);
	},
	
	setMovements_2: function () {
		
		var me = this;
		
		//pageHeight = $(document).height() ;
        //pageWidth = $(document).width();
        var options = JSON.stringify({
			scale: 33,
			 pageHeight: me.pageHeight,
             pageWidth: me.pageWidth,
			//pageHeight: 4100,
			//pageWidth: 4200,
			//adjustPageHeight: 1,
			noLayout: 0
		});
        me.renderer.setOptions(options);
        me.renderer.redoLayout();
      
		var svg = me.renderer.renderPage(1, options);
		for (i = 2; i <= me.renderer.getPageCount();
		i++) {
			svg = svg + me.renderer.renderPage(i, options);
		}
		$('#' + me.currId + '-body').html(svg);
	},
	
	setPageSpinner: function(pageSpinner){
		this.pageSpinner = pageSpinner;
		
	}
});