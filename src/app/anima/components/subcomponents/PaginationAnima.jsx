
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const PaginationAnima = ({setPageno,pageno,itemlist}) => {
    return (
        <>
            <Pagination className="justify-start">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={() => setPageno(old => Math.max(old - 1, 0))} className={`${pageno === 1 ? 'disabled-link' : null}`} />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">{pageno}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        No. of Results ({itemlist.pagination.items.count})
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext onClick={() => { setPageno(old => old + 1) }} className={`${!itemlist?.pagination.has_next_page ? 'disabled-link' : null}`} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

        </>
    )
}

export default PaginationAnima
