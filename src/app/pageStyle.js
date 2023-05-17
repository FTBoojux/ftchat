const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
    },
    box: {
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '32px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    tabButtons: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '16px',
    },
    tabButton: {
        background: 'none',
        border: 'none',
        fontSize: '16px',
        color: '#999999',
        padding: '8px',
        cursor: 'pointer',
        outline: 'none',
    },
    activeTabButton: {
        color: '#333333',
        fontWeight: 'bold',
    },
    extraOptions: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '16px',
    },
};

export default styles;
