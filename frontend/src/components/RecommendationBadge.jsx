function RecommendationBadge({ recommendation }) {

    const config = {
        "🟢 Quick Win": {
            bg: "#DCFCE7",
            color: "#15803D",
            icon: "💡"
        },

        "🔴 Needs Discussion": {
            bg: "#FEE2E2",
            color: "#DC2626",
            icon: "⚠️"
        },

        "⚪ Low Priority": {
            bg: "#F1F5F9",
            color: "#475569",
            icon: "📌"
        },

        "🟡 Normal Priority": {
            bg: "#FEF3C7",
            color: "#B45309",
            icon: "⭐"
        }
    };

    const style =
        config[recommendation] ||
        config["🟡 Normal Priority"];

    return (

        <div
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 14px",
                borderRadius: "999px",
                background: style.bg,
                color: style.color,
                fontWeight: 600,
                fontSize: "14px"
            }}
        >
            <span>{style.icon}</span>

            <span>{recommendation}</span>

        </div>

    );

}

export default RecommendationBadge;