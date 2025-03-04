'use client';
import { useRouter } from 'next/navigation';
import styles from './pagination.module.css';

export default function Pagination({ current, total, pageSize, baseUrl }) {
    const router = useRouter();
    const totalPages = Math.ceil(total / pageSize);
    
    const getPageNumbers = () => {
        const pages = [];
        const showPages = 5;
        
        let start = Math.max(1, current - Math.floor(showPages / 2));
        let end = Math.min(totalPages, start + showPages - 1);
        
        if (end - start + 1 < showPages) {
            start = Math.max(1, end - showPages + 1);
        }
        
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        router.push(`${baseUrl}?page=${page}`);
    };

    if (totalPages <= 1) return null;

    return (
        <div className={styles.pagination}>
            <button 
                onClick={() => handlePageChange(current - 1)}
                disabled={current === 1}
                className={`${styles.btn} ${styles.prevNext}`}
            >
                上一页
            </button>

            {getPageNumbers().map(pageNum => (
                <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`${styles.btn} ${pageNum === current ? styles.active : ''}`}
                >
                    {pageNum}
                </button>
            ))}

            <button 
                onClick={() => handlePageChange(current + 1)}
                disabled={current === totalPages}
                className={`${styles.btn} ${styles.prevNext}`}
            >
                下一页
            </button>
        </div>
    );
}