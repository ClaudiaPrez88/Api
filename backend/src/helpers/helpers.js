const handleGenerateHATEOAS = (data) => {
    const { currentPage, pages, limits } = data;
    const links = {};
    if (currentPage > 1) {
      links.prev = `/joyas?page=${currentPage - 1}&limits=${limits}`;
    }
    if (currentPage < pages) {
      links.next = `/joyas?page=${currentPage + 1}&limits=${limits}`;
    }
    return { ...data, links };
  };
  
  module.exports = { handleGenerateHATEOAS };
  