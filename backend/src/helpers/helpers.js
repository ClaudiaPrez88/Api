const handleGenerateHATEOAS = (data) => {
    const { currentPage, pages, limit } = data;
    const links = {};
    if (currentPage > 1) {
      links.prev = `/joyas?page=${currentPage - 1}&limit=${limit}`;
    }
    if (currentPage < pages) {
      links.next = `/joyas?page=${currentPage + 1}&limit=${limit}`;
    }
    return { ...data, links };
  };
  
  module.exports = { handleGenerateHATEOAS };
  