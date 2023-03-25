import { Button } from "@chakra-ui/react";

function createArrayOfSize(n) {
    return new Array(n).fill(0);
  }
  
  function Pagination({ currentPage, handlePageChange, totalPages }) {
    let pages = createArrayOfSize(totalPages).map((a, i) => {
      return (
        <Button
          data-testid="page-btn"
          onClick={() => handlePageChange(i + 1)}
          disabled={currentPage == i + 1}
          margin='1px'
          padding={'5px'}
        >
          {i + 1}
        </Button>
      );
    });
    return <div>{pages}</div>;
  }
  
  export default Pagination;
  