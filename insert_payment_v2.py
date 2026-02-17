
indent = " " * 64
# Using simple strings to avoid f-string escaping hell
content_lines = [
    '{/* Payment Details Card - Full Width */}\n',
    '<div className="bg-black/30 border border-white/[0.06] rounded-2xl p-6 relative overflow-hidden group/pay">\n',
    '    <div className="absolute top-0 right-0 w-24 h-24 bg-[#00E676]/[0.03] rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2" />\n',
    '    <div className="flex items-center gap-2 mb-4">\n',
    '        <Wallet className="w-4 h-4 text-[#00E676]" />\n',
    '        <p className="text-[10px] text-white/25 font-semibold uppercase tracking-wider">Payment Details</p>\n',
    '    </div>\n',
    '\n',
    '    {method ? (\n',
    '        <div className="space-y-4">\n',
    '            <div className="flex items-center gap-3">\n',
    '                <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.06]">\n',
    '                    {methodIcon(method.method_type)}\n',
    '                </div>\n',
    '                <div>\n',
    '                    <p className="text-[13px] font-bold text-white">{methodLabel(method.method_type)}</p>\n',
    '                    <p className="text-[10px] text-white/30">Primary Method</p>\n',
    '                </div>\n',
    '            </div>\n',
    '\n',
    '            <div className="grid grid-cols-2 gap-8 pt-4 border-t border-white/[0.06]">\n',
    '                {method.method_type === "bank_transfer" && (\n',
    '                    <>\n',
    '                        <div className="space-y-3">\n',
    '                            <div><p className="text-[10px] text-white/25 uppercase font-semibold">Bank Name</p><p className="text-[12px] font-medium text-white/90">{method.bank_name || "—"}</p></div>\n',
    '                            <div><p className="text-[10px] text-white/25 uppercase font-semibold">Account Name</p><p className="text-[12px] font-medium text-white/90">{method.account_name || "—"}</p></div>\n',
    '                        </div>\n',
    '                        <div className="space-y-3">\n',
    '                            <div>\n',
    '                                <p className="text-[10px] text-white/25 uppercase font-semibold">Account Number / IBAN</p>\n',
    '                                <div className="flex items-center gap-2 group/iban">\n',
    '                                    <p className="text-[12px] font-mono text-white/90">{method.account_number || "—"}</p>\n',
    '                                    {method.account_number && <button onClick={() => navigator.clipboard.writeText(method.account_number)} className="opacity-0 group-hover/iban:opacity-100 text-[10px] text-[#00E676] hover:underline">Copy</button>}\n',
    '                                </div>\n',
    '                            </div>\n',
    '                            <div><p className="text-[10px] text-white/25 uppercase font-semibold">Swift / BIC</p><p className="text-[12px] font-mono text-white/90">{method.swift_code || "—"}</p></div>\n',
    '                        </div>\n',
    '                    </>\n',
    '                )}\n',
    '\n',
    '                {method.method_type === "crypto" && (\n',
    '                    <>\n',
    '                        <div><p className="text-[10px] text-white/25 uppercase font-semibold">Network</p><p className="text-[12px] font-bold text-[#00E676]">{method.crypto_network || "TRC20"}</p></div>\n',
    '                        <div className="col-span-2">\n',
    '                            <p className="text-[10px] text-white/25 uppercase font-semibold mb-1">Wallet Address</p>\n',
    '                            <div className="flex items-center gap-3 bg-black/40 p-3 rounded-xl border border-white/[0.06]">\n',
    '                                <code className="text-[11px] font-mono text-white/90 break-all select-all">{method.crypto_wallet_address || "No address provided"}</code>\n',
    '                                {method.crypto_wallet_address && <button onClick={() => navigator.clipboard.writeText(method.crypto_wallet_address)} className="text-[11px] font-bold text-[#00E676] hover:underline whitespace-nowrap ml-auto px-2">Copy</button>}\n',
    '                            </div>\n',
    '                        </div>\n',
    '                    </>\n',
    '                )}\n',
    '\n',
    '                {method.method_type === "paypal" && (\n',
    '                    <div className="col-span-2">\n',
    '                        <p className="text-[10px] text-white/25 uppercase font-semibold mb-1">PayPal Email</p>\n',
    '                        <div className="flex items-center gap-3 bg-black/40 p-3 rounded-xl border border-white/[0.06]">\n',
    '                            <span className="text-[12px] text-white/90">{method.paypal_email || "No email provided"}</span>\n',
    '                            {method.paypal_email && <button onClick={() => navigator.clipboard.writeText(method.paypal_email)} className="text-[11px] font-bold text-[#00E676] hover:underline whitespace-nowrap ml-auto">Copy</button>}\n',
    '                        </div>\n',
    '                    </div>\n',
    '                )}\n',
    '            </div>\n',
    '        </div>\n',
    '    ) : (\n',
    '        <div className="flex flex-col items-center justify-center py-6 text-center">\n',
    '            <AlertCircle className="w-6 h-6 text-red-400/50 mb-2" />\n',
    '            <p className="text-[12px] text-red-400/50">No payment method connected</p>\n',
    '        </div>\n',
    '    )}\n',
    '</div>\n'
]

replacement_block = "".join([indent + line for line in content_lines])

with open('src/components/AdminDashboard.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Replace lines 319-320 (0-indexed) with the new block.
# Assuming previous state: 
# 319: <div>\n
# 320: </div>\n
# We replace 319 with the block and delete 320.

lines[319] = replacement_block
del lines[320]

with open('src/components/AdminDashboard.tsx', 'w', encoding='utf-8') as f:
    f.writelines(lines)
