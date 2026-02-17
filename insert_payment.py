
indent = " " * 64
new_content = [
    f'{indent}{{/* Payment Details Card - Full Width */}}\n',
    f'{indent}<div className="bg-black/30 border border-white/[0.06] rounded-2xl p-6 relative overflow-hidden group/pay">\n',
    f'{indent}    <div className="absolute top-0 right-0 w-24 h-24 bg-[#00E676]/[0.03] rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2" />\n',
    f'{indent}    <div className="flex items-center gap-2 mb-4">\n',
    f'{indent}        <Wallet className="w-4 h-4 text-[#00E676]" />\n',
    f'{indent}        <p className="text-[10px] text-white/25 font-semibold uppercase tracking-wider">Payment Details</p>\n',
    f'{indent}    </div>\n',
    f'\n',
    f'{indent}    {{method ? (\n',
    f'{indent}        <div className="space-y-4">\n',
    f'{indent}            <div className="flex items-center gap-3">\n',
    f'{indent}                <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.06]">\n',
    f'{indent}                    {{methodIcon(method.method_type)}}\n',
    f'{indent}                </div>\n',
    f'{indent}                <div>\n',
    f'{indent}                    <p className="text-[13px] font-bold text-white">{{methodLabel(method.method_type)}}</p>\n',
    f'{indent}                    <p className="text-[10px] text-white/30">Primary Method</p>\n',
    f'{indent}                </div>\n',
    f'{indent}            </div>\n',
    f'\n',
    f'{indent}            <div className="grid grid-cols-2 gap-8 pt-4 border-t border-white/[0.06]">\n',
    f'{indent}                {{method.method_type === "bank_transfer" && (\n',
    f'{indent}                    <>\n',
    f'{indent}                        <div className="space-y-3">\n',
    f'{indent}                            <div><p className="text-[10px] text-white/25 uppercase font-semibold">Bank Name</p><p className="text-[12px] font-medium text-white/90">{{method.bank_name || "—"}}</p></div>\n',
    f'{indent}                            <div><p className="text-[10px] text-white/25 uppercase font-semibold">Account Name</p><p className="text-[12px] font-medium text-white/90">{{method.account_name || "—"}}</p></div>\n',
    f'{indent}                        </div>\n',
    f'{indent}                        <div className="space-y-3">\n',
    f'{indent}                            <div>\n',
    f'{indent}                                <p className="text-[10px] text-white/25 uppercase font-semibold">Account Number / IBAN</p>\n',
    f'{indent}                                <div className="flex items-center gap-2 group/iban">\n',
    f'{indent}                                    <p className="text-[12px] font-mono text-white/90">{{method.account_number || "—"}}</p>\n',
    f'{indent}                                    {{method.account_number && <button onClick={() => navigator.clipboard.writeText(method.account_number)} className="opacity-0 group-hover/iban:opacity-100 text-[10px] text-[#00E676] hover:underline">Copy</button>}}\n',
    f'{indent}                                </div>\n',
    f'{indent}                            </div>\n',
    f'{indent}                            <div><p className="text-[10px] text-white/25 uppercase font-semibold">Swift / BIC</p><p className="text-[12px] font-mono text-white/90">{{method.swift_code || "—"}}</p></div>\n',
    f'{indent}                        </div>\n',
    f'{indent}                    </>\n',
    f'{indent}                )}}\n',
    f'\n',
    f'{indent}                {{method.method_type === "crypto" && (\n',
    f'{indent}                    <>\n',
    f'{indent}                        <div><p className="text-[10px] text-white/25 uppercase font-semibold">Network</p><p className="text-[12px] font-bold text-[#00E676]">{{method.crypto_network || "TRC20"}}</p></div>\n',
    f'{indent}                        <div className="col-span-2">\n',
    f'{indent}                            <p className="text-[10px] text-white/25 uppercase font-semibold mb-1">Wallet Address</p>\n',
    f'{indent}                            <div className="flex items-center gap-3 bg-black/40 p-3 rounded-xl border border-white/[0.06]">\n',
    f'{indent}                                <code className="text-[11px] font-mono text-white/90 break-all select-all">{{method.crypto_wallet_address || "No address provided"}}</code>\n',
    f'{indent}                                {{method.crypto_wallet_address && <button onClick={() => navigator.clipboard.writeText(method.crypto_wallet_address)} className="text-[11px] font-bold text-[#00E676] hover:underline whitespace-nowrap ml-auto px-2">Copy</button>}}\n',
    f'{indent}                            </div>\n',
    f'{indent}                        </div>\n',
    f'{indent}                    </>\n',
    f'{indent}                )}}\n',
    f'\n',
    f'{indent}                {{method.method_type === "paypal" && (\n',
    f'{indent}                    <div className="col-span-2">\n',
    f'{indent}                        <p className="text-[10px] text-white/25 uppercase font-semibold mb-1">PayPal Email</p>\n',
    f'{indent}                        <div className="flex items-center gap-3 bg-black/40 p-3 rounded-xl border border-white/[0.06]">\n',
    f'{indent}                            <span className="text-[12px] text-white/90">{{method.paypal_email || "No email provided"}}</span>\n',
    f'{indent}                            {{method.paypal_email && <button onClick={() => navigator.clipboard.writeText(method.paypal_email)} className="text-[11px] font-bold text-[#00E676] hover:underline whitespace-nowrap ml-auto">Copy</button>}}\n',
    f'{indent}                        </div>\n',
    f'{indent}                    </div>\n',
    f'{indent}                )}}\n',
    f'{indent}            </div>\n',
    f'{indent}        </div>\n',
    f'{indent}    ) : (\n',
    f'{indent}        <div className="flex flex-col items-center justify-center py-6 text-center">\n',
    f'{indent}            <AlertCircle className="w-6 h-6 text-red-400/50 mb-2" />\n',
    f'{indent}            <p className="text-[12px] text-red-400/50">No payment method connected</p>\n',
    f'{indent}        </div>\n',
    f'{indent}    )}\n',
    f'{indent}</div>\n'
]

with open('src/components/AdminDashboard.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Replace lines 319-320 (0-indexed, corresponding to 320-321 1-based)
# Lines are currently:
# 319: (indent)<div>\n
# 320: (indent)</div>\n
lines[319] = "".join(new_content) # Insert all new content at index 319 (line 320)
del lines[320] # Remove index 320 (line 321, which was the closing div, now redundant or part of new content)

# Note: The new_content list includes the closing div.
# "new_content" is a list of strings. I'm joining them into one string for lines[319].
# And deleting lines[320] because new_content includes the replacement for that too.

with open('src/components/AdminDashboard.tsx', 'w', encoding='utf-8') as f:
    f.writelines(lines)
