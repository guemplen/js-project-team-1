  //import 'tui-pagination/dist/tui-pagination.css';

const windowWidth = Math.round(window.visualViewport.width);

const visiblePages = windowWidth > 760 ? 3 : 5;

export const options = {
  totalItems: 5,
  itemsPerPage: 1,
  visiblePages,
  template: {
    page: '<button type="button" class="tui-page-btn">{{page}}</button>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<button type="button" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</button>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<button type="button" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</button>',
  },
};
